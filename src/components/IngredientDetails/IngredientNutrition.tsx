type TIngredientNutrition = {
  title: string,
  value: number
}

export function IngredientNutrition(props: TIngredientNutrition) {
  return (
    <div>
      <p className="text text_type_main-default text_color_inactive">
        {props.title}
      </p>
      <p className="text text_type_digits-default">{props.value}</p>
    </div>
  );
}

