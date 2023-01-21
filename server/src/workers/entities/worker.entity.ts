import { JobTitle } from "src/job_title/entities/job_title.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from 'argon2';
@Entity("workers")
export class Worker {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    first_name: string
    @Column()
    second_name: string
    @Column()
    last_name: string
    @ManyToOne(() => JobTitle, (job) => job.id)
    @JoinColumn([{ name: "job_id"}])
    job_id: number
    @Column({ type: "varchar", length: 40 })
    phone_number: string
    @Column({ nullable: true, default: "123" })
    password: string
}
