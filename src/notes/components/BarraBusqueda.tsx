import styled from 'styled-components';

interface Props {
  valor: string;
  onBuscar: (texto: string) => void;
}

const BarraBusqueda = ({ valor, onBuscar }: Props) => {
  return (
    <StyledWrapper>
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Buscar notas..."
          value={valor}
          onChange={(e) => onBuscar(e.target.value)}
        />
        <button className="search__button">
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .search__input {
    font-family: inherit;
    font-size: 1rem;
    background-color: #ffebcc;
    border: none;
    color: #75287b;
    padding: 0.7rem 1rem;
    border-radius: 30px;
    width: 100%;
    max-width: 600px;
    transition: all ease-in-out 0.5s;
    margin-right: -2rem;
  }

  .search__input:hover,
  .search__input:focus {
    box-shadow: 0 0 1em #00000013;
  }

  .search__input:focus {
    outline: none;
    background-color: #ffebcc;
  }

  .search__input::placeholder {
    font-weight: 100;
    color: #75287b;
  }

  .search__input:focus + .search__button {
    background-color: #ffebcc;
  }

  .search__button {
    border: none;
    background-color: #ffebcc;
    margin-top: 0.1em;
  }

  .search__button:hover {
    cursor: pointer;
  }

  .search__icon {
    height: 1.3em;
    width: 1.3em;
    fill: #75287b;
  }
`;

export default BarraBusqueda;
