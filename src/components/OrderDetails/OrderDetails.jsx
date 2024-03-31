import styles from "./OrderDetails.module.css";
import logoDone from "./../../images/done.jpg";
export function OrderDetails() {
  return (
    <div className={styles.order}>
      <h2 className="text text_type_digits-large mt-20 mb-8">034568</h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img
        src={logoDone}
        alt="Заказ принят"
        className={`${styles.logo} mt-15 mb-15`}
      />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="mt-2 mb-30 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
