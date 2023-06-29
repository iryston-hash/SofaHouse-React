import {useFilterContext} from '../context/filter_context';
import {BsFillGridFill, BsList} from 'react-icons/bs';
import styled from 'styled-components';

const Sort = () => {
  const {
    filtered_products,
    grid_view,
    setGridView,
    setListView,
    sort,
    handleSort,
  } = useFilterContext();

  return (
    <Wrapper>
      <div className='btn-container'>
        <button
          className={`${grid_view ? 'active' : null}`}
          onClick={setGridView}
          type='button'
        >
          <BsFillGridFill />
        </button>
        <button
          className={`${!grid_view ? 'active' : null}`}
          onClick={setListView}
          type='button'
        >
          <BsList />
        </button>
      </div>
      <p>products found ({filtered_products.length})</p>
      <hr />
      <form>
        <label htmlFor='sort' style={{marginRight: '10px'}}>
          sort by
        </label>
        <select
          className='sort-input'
          value={sort}
          onChange={handleSort}
          name='sort'
          id='sort'
        >
          <option value='price-lowest'>price (lowest)</option>
          <option value='price-highest'>price (highest)</option>
          <option value='name-a'>name (a - z)</option>
          <option value='name-z'>name (z - a)</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;

  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;