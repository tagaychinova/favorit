import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

const formatPrice = (amount) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

function GoodsTable({ goods = [] }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Тип</th>
          <th>Название</th>
          <th>Производитель</th>
          <th>Стоимость (цена)</th>
          <th>Доступный остаток на складе</th>
        </tr>
      </thead>
      <tbody>
        {goods.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <th>
              {item.isOriginal && (
                <Badge
                  bg="success-subtle"
                  className="text-success-emphasis ms-auto fw-normal"
                >
                  Оригинал
                </Badge>
              )}
              {!item.isOriginal && (
                <Badge
                  bg="primary-subtle"
                  className="text-primary-emphasis ms-auto fw-normal"
                >
                  Аналог
                </Badge>
              )}
            </th>
            <td>{item.name}</td>
            <td>{item.brand}</td>
            <td className="text-end font-monospace">
              {formatPrice(item.price)}
            </td>
            <td className="text-end font-monospace">{item.stock}</td>
          </tr>
        ))}
        {goods.length === 0 && (
          <tr>
            <td colSpan={6}>Ничего не найдено</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default GoodsTable;
