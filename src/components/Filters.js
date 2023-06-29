import styled from 'styled-components';
import {useFilterContext} from '../context/filter_context';
import {getUniqueValues, formatPrice} from '../utils/helpers';
import {FaCheck} from 'react-icons/fa';

const Filters = () => {
  const {
    filters: {
      text,
      company,
      category,
      color,
      min_price,
      max_price,
      def_price,
      shipping,
    },
    handleFilters,
    all_products,
    resetFilters,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  const colors = getUniqueValues(all_products, 'colors');

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input
              className='search-input'
              type='text'
              name='text'
              value={text}
              onChange={handleFilters}
              placeholder='leather...'
            />
          </div>

          <div className='form-control'>
            <h5>categories</h5>
            <div>
              {categories.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`${
                      category === item.toLowerCase() ? 'active' : null
                    }`}
                    onClick={handleFilters}
                    name='category'
                    type='button'
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='form-control'>
            <h5>companies</h5>
            <select
              name='company'
              value={company}
              type='button'
              onChange={handleFilters}
              className='company'
            >
              {companies.map((company, index) => {
                return (
                  <option key={index} value={company}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((clr, index) => {
                if (clr === 'all') {
                  return (
                    <button
                      key={index}
                      type='button'
                      name='color'
                      onClick={handleFilters}
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                      data-color='all'
                    >
                      all
                    </button>
                  );
                }

                return (
                  <button
                    key={index}
                    name='color'
                    type='button'
                    onClick={handleFilters}
                    style={{background: clr}}
                    data-color={clr}
                    className={`${
                      color === clr ? 'color-btn active' : 'color-btn'
                    }`}
                  >
                    {color === clr ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(def_price)}</p>
            <input
              type='range'
              name='def_price'
              onChange={handleFilters}
              min={min_price}
              max={max_price}
              value={def_price}
            />
          </div>

          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              id='shipping'
              name='shipping'
              onChange={handleFilters}
              checked={shipping}
              type='checkbox'
            />
          </div>
        </form>
        <button className='clear-btn' onClick={resetFilters} type='button'>
          reset
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    outline-color: var(--clr-primary-3);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
