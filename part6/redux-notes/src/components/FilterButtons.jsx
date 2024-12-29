import { setFilter } from '../reducers/filterReducer'
import { useSelector, useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)


  return (
    <div style={{ margin: 10 }}>
      <label style={{ marginRight: 5 }}>
          <input
            type="radio"
            name="filter"
            value="ALL"
            checked={filter === 'ALL'}
            onChange={() => dispatch(setFilter('ALL'))}
            style={{ marginRight: 5 }}
          />
          All
        </label>
        <label style={{ marginRight: 5 }}>
          <input
            type="radio"
            name="filter"
            value="IMPORTANT"
            checked={filter === 'IMPORTANT'}
            onChange={() => dispatch(setFilter('IMPORTANT'))}
            
          />
          Important
        </label>
        <label style={{ marginRight: 5 }}>
          <input
            type="radio"
            name="filter"
            value="NON_IMPORTANT"
            checked={filter === 'NON_IMPORTANT'}
            onChange={() => dispatch(setFilter('NON_IMPORTANT'))}
           
          />
          Non Important
        </label>
    </div>
  );
}

export default Filter;