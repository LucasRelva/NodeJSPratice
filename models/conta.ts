 export = class transaction {
     public id: number
     public name: string
     public type: string
     public value: number

     public constructor (id:number, name:string, type:string, value:number){

        this.id = id
        this.name = name
        this.type = type
        this.value = value
        
     }
 }