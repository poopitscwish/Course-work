import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("menu")
export class Menu {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({type: "text" , nullable: true })
    description: string[]
    @Column()
    price: number
}
