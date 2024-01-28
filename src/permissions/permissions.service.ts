import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  create(createPermissionInput: CreatePermissionInput) {
    return this.permissionRepository.save(createPermissionInput);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findByIds(ids: string[]) {
    return this.permissionRepository.find({
      where: { id: In(ids) },
      relations: ['roles'],
    });
  }

  findOne(id: string) {
    return this.permissionRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePermissionInput: UpdatePermissionInput) {
    await this.permissionRepository.update(id, updatePermissionInput);
    return this.permissionRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });

    if (permission) {
      await this.permissionRepository.delete({ id });

      return permission;
    }

    throw new BadRequestException('Permission does not exist');
  }
}
