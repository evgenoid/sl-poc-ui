import { Button, TextField } from "@material-ui/core";
import React  from "react";

export const ParamsList = ({ params, onAdd, onRemove, onKeyChange, onValueChange }) => {
  return <div>
    <div className='params'>
      Params:
      <Button
        className='button'
        variant='contained'
        color='primary'
        size='small'
        onClick={onAdd}
      >
        Add
      </Button>
    </div>
    {params.map(({key, value}, index) => (
      <div className='field-container' key={`p-${index}`}>
        <TextField
          fullWidth={true}
          className='field'
          id={`n-${index}`}
          name={`n-${index}`}
          placeholder='Name'
          value={params[index].key}
          onChange={event => {
            event.persist();
            onKeyChange(index, event.target.value);
          }}
        />
        <div className='separator'>-</div>
        <TextField
          fullWidth={true}
          className='field'
          id={`v-${index}`}
          name={`v-${index}`}
          placeholder='Value'
          value={params[index].value}
          onChange={event => {
            event.persist();
            onValueChange(index, event.target.value);
          }}
        />
        <Button
          className='button'
          variant='text'
          type='submit'
          color='secondary'
          size='small'
          onClick={() => onRemove(index)}
        >
          Remove
        </Button>
      </div>
    ))}
  </div>
}