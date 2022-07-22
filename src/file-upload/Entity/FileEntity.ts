import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  fileId: string;

  @Column()
  fileName: string;

  @Column()
  fileUploadUser: number;

  @Column()
  fileSize: number;

  @CreateDateColumn()
  fileUploadTime: Date;
}
