import styled from 'styled-components';

const Contact = () => {
  return (
    <Wrapper>
      <div className='section-center'>
        <h3>
          <span>Sign up</span> for our newsletter <br /> and get
          <span> 10% discount</span>
        </h3>
        <div className='content'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem odit
            debitis expedita rerum! Nihil, adipisci ipsa sint quos et eum.
          </p>
          <form
            name='email'
            className='contact-form'
            action='https://formspree.io/f/mvonyako'
            method='POST'
          >
            <input
              className='form-input'
              required
              type='email'
              name='email'
              placeholder='youremail@.com'
            />
            <button className='submit-btn' type='submit'>
              sing up
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  h3 {
    line-height: 2.4rem;
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }
  span {
    color: black;
    -webkit-text-stroke: 1px;
    -webkit-text-fill-color: var(--clr-primary-5);
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    padding: 0 0 0 1rem;
    opacity: 0.6;
  }
  .submit-btn {
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`;

export default Contact;
