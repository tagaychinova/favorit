import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import SearchPanel from "./SearchPanel/SearchPanel";
import GoodsTable from "./GoodsTable/GoodsTable";
import { useGetGoodsQuery } from "@/features/api/apiSlice";

function App() {
  const { number, brand } = useSelector((state) => state.filter);

  const isReady = Boolean(number && brand);

  const {
    currentData: goods = [],
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetGoodsQuery(
    {
      number,
      brand,
    },
    {
      skip: !isReady,
    },
  );

  const showSpinner = isFetching;
  const showError = !isFetching && isError;
  const showTable = !isFetching && isReady && isSuccess;

  return (
    <>
      <SearchPanel className="mb-5" />

      {showSpinner && (
        <section className="d-flex align-items-center gap-3 m-2">
          <Spinner animation="border" variant="primary" />
          <span>Загрузка товаров...</span>
        </section>
      )}

      {showError && (
        <Alert variant="danger" className="m-2">
          Ошибка загрузки товаров
          {error?.data?.error && `: ${error.data.error}`}
        </Alert>
      )}

      {showTable && <GoodsTable goods={goods} />}
    </>
  );
}

export default App;
