import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly permissionService: PermissionsService,
  ) {}

  async create({ name, permissions: ids }: CreateRoleInput) {
    try {
      const permissions = await this.permissionService.findByIds(ids);

      const role = this.roleRepository.create({
        name,
        permissions,
      });

      return this.roleRepository.save(role);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  findByName(name: string) {
    return this.roleRepository.find({
      where: { name },
      relations: ['permissions'],
    });
  }

  findOne(id: string) {
    return this.roleRepository.findOne({ where: { id } });
  }

  async update(id: string, { name, permissions: ids }: UpdateRoleInput) {
    try {
      const permissions = await this.permissionService.findByIds(ids);
      const updatedRole = this.roleRepository.create({ id, name, permissions });

      await this.roleRepository.save(updatedRole);

      return this.roleRepository.findOne({
        where: { id },
        relations: ['permissions'],
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (role) {
      await this.roleRepository.delete({ id });
      return role;
    }

    throw new BadRequestException('role does not exist');
  }
}
