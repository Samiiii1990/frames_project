export class Frame {
    id?: string; 
    model: string;
    gender: string;
    material: string;
    style: string;
    color: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
    imageUrl?: string | null;
  
    constructor(
      id: string = '', 
      model: string,
      gender: string,
      material: string,
      style: string,
      color: string,
      price: number,
      createdAt?: Date,
      updatedAt?: Date,
      imageUrl?: string | null
    ) {
      this.id = id;
      this.model = model;
      this.gender = gender;
      this.material = material;
      this.style = style;
      this.color = color;
      this.price = price;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.imageUrl = imageUrl;
    }
  }