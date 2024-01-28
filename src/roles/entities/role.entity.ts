import { ObjectType, Field } from '@nestjs/graphql';
import { Admin } from 'src/admin/entities/admin.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  @Field(() => [Permission])
  permissions: Permission[];

  @ManyToMany(() => Admin, (admin) => admin.roles)
  admin: Admin[];
}
