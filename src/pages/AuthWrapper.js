import {useAuth0} from '@auth0/auth0-react';
import {Loading} from '../components';
import styled from 'styled-components';

const AuthWrapper = ({children}) => {
  const {isLoading, error} = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <h2>{error.message}</h2>
      </Wrapper>
    );
  }

  return <>{children}</>;
};

const Wrapper = styled.section`
  min-height: 100dvh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
