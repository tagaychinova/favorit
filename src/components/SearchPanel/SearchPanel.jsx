import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ArrowRightImage, SearchImage } from "../images";
import { setNumber, setBrand } from "@/features/filter/filterSlice";
import { useDebounce } from "@/hooks";
import { useGetBrandsQuery } from "@/features/api/apiSlice";

function SearchPanel({ className }) {
  const { number, brand } = useSelector((state) => state.filter);
  const debouncedNumber = useDebounce(number, 500);
  const dispatch = useDispatch();

  const isReady = Boolean(debouncedNumber);

  const {
    currentData: brands = [],
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetBrandsQuery(
    { number: debouncedNumber },
    {
      skip: !isReady,
    },
  );

  const hasBrands = brands.length > 0;
  const isBrandSelectVisible = isReady && !isFetching && isSuccess && hasBrands;
  const showInfoText = isReady && !isBrandSelectVisible;

  const handleNumberChange = (event) => {
    dispatch(setNumber(event.target.value));
  };

  const handleBrandChange = (event) => {
    dispatch(setBrand(event.target.value));
  };

  return (
    <section className={className}>
      <InputGroup>
        <InputGroup.Text>
          <SearchImage />
        </InputGroup.Text>
        <Form.Control
          placeholder="Введите артикул (номер) автозапчасти"
          value={number}
          onChange={handleNumberChange}
        />
        <InputGroup.Text className={!isBrandSelectVisible ? "invisible" : ""}>
          <ArrowRightImage />
        </InputGroup.Text>
        <Form.Select
          className={!isBrandSelectVisible ? "invisible" : ""}
          value={brand}
          onChange={handleBrandChange}
        >
          <option value="">Выберите производителя</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </Form.Select>
      </InputGroup>
      {showInfoText && (
        <Form.Text className="ms-5 ps-1 d-block">
          {isFetching && "Загрузка производителей..."}

          {isSuccess && !hasBrands && "Производители не найдены"}

          {isError && (
            <span className="text-danger">
              Ошибка загрузки производителей
              {error?.data?.error && `: ${error.data.error}`}
            </span>
          )}
        </Form.Text>
      )}
    </section>
  );
}

export default SearchPanel;
