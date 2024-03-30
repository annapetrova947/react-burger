import "./OrderDetails.css";
import logoDone from "./../../images/done.jpg";
export function OrderDetails() {
  return (
    <div className="order">
      <h2 className="text text_type_digits-large mt-20 mb-8">034568</h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={logoDone} className="order__logo mt-15 mb-15" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="mt-2 mb-30 text text_type_main-small">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
