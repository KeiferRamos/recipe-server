import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginAdminInput } from './dto/login-admin.input';
import { RolesService } from 'src/roles/roles.service';
import { CategoryType } from 'src/enums';
import { Role } from 'src/roles/entities/role.entity';
import { UserRoleInput } from './dto/update-user-role.input';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly roleService: RolesService,
  ) {}

  async create({ password, username, admin_pass, ...rest }: CreateAdminInput) {
    try {
      let roles;
      const user = await this.adminRepository.findOneBy({ username });

      if (user) {
        throw new BadRequestException('username already inused');
      }

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      if (admin_pass === process.env.SUPER_ADMIN) {
        roles = await this.roleService.findByName(CategoryType.SUPER_ADMIN);
      } else {
        roles = await this.roleService.findByName(CategoryType.ADMIN);
      }

      const admin = this.adminRepository.create({
        password: hash,
        username,
        roles,
        ...rest,
      });

      return this.adminRepository.save(admin);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login({ username, password }: loginAdminInput) {
    try {
      const admin = await this.adminRepository.findOne({
        where: { username },
        relations: {
          roles: {
            permissions: true,
          },
        },
      });

      if (!admin) {
        throw new BadRequestException('username or password is incorrect');
      }

      const verifyPassword = await bcrypt.compare(password, admin.password);

      if (!verifyPassword) {
        throw new BadRequestException('username or password is incorrect');
      }

      return {
        access_token: this.jwtService.sign({
          id: admin.id,
          permissions: admin.roles[0].permissions,
        }),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return this.adminRepository.find({
      relations: {
        address: true,
        roles: {
          permissions: true,
        },
      },
    });
  }

  findOne(id: string) {
    return this.adminRepository.findOne({
      where: { id },
      relations: {
        address: true,
        roles: {
          permissions: true,
        },
      },
    });
  }

  async updateUserRole({ id, role_name }: UserRoleInput) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    const roles = await this.roleService.findByName(role_name);

    const updatedAdmin = this.adminRepository.create({ ...admin, id, roles });

    return this.adminRepository.save(updatedAdmin);
  }

  findOneByUsername(username: string) {
    return this.adminRepository.findOne({ where: { username } });
  }

  async update(updateAdminInput: UpdateAdminInput, user: Admin) {
    await this.adminRepository.update({ id: user.id }, { ...updateAdminInput });

    return this.adminRepository.findOne({
      where: { id: user.id },
      relations: ['address'],
    });
  }

  async remove(id: string) {
    await this.adminRepository.delete({ id });

    return 'user successfully removed';
  }
}
