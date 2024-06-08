export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  image: string,
  price: number,
  carbohydrates: number,
  fat: number,
  proteins: number,
  calories: number,
  image_large: string,
}


export type TChoosenIng = TIngredient & {
  id: string
}