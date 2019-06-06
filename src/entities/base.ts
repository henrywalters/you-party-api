import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn } from "typeorm";

export default class Base extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({type: "datetime", nullable: true})
    deletedAt: Date | null;
    
}