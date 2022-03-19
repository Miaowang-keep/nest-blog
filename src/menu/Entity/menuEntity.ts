import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn()
  menuid: number;

  @Column()
  pmenuid: number;

  @Column()
  url: string;

  @Column()
  order: number;

  @Column()
  menuType: string;

  @Column()
  menuDesc: string;

  @Column()
  menuName: string;

  @Column({ default: null })
  createUserid: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  path: string;

  @Column()
  menuState: string;
}
