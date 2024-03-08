import { ObjectType, Field } from '@nestjs/graphql';
import { Admin } from 'src/admin/entities/admin.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Field(() => [Permission])
  permissions: Permission[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field({ nullable: true })
  updatedAt: Date;

  @ManyToMany(() => Admin, (admin) => admin.roles, { onDelete: 'CASCADE' })
  admin: Admin[];
}
