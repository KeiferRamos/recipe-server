import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async createOrUpdate(inputs: CreateRoleInput) {
    try {
      const role = this.roleRepository.create(inputs);
      return this.roleRepository.save(role);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.roleRepository.find();
  }

  findByName(name: string) {
    return this.roleRepository.find({
      where: { name },
    });
  }

  findOne(id: string) {
    return this.roleRepository.findOne({ where: { id } });
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
