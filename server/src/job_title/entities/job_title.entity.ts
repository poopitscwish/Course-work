import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("job_title")
export class JobTitle {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    payment:number
}
