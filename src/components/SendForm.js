import axios from "axios";
import { Form, Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { ParamsList } from "./ParamsList";
import React, { useState } from "react";
import { API_URL } from "../const/api";
import BeatLoader from "react-spinners/BeatLoader";

export const SendForm = () => {
  const [tplParams, setTplParams] = useState([]);
  const [saving, setSaving] = useState(false);
  const [processedResult, setProcessedResult] = useState('');

  return <Formik
    initialValues={{
      template: '',
      templateParams: {},
    }}
    onSubmit={async values => {
      setSaving(true);
      const res = await axios.post(`${API_URL}/template/process`,{
        "template": values.template,
        "templateParams": Object.fromEntries(tplParams.map(({key, value}) => [key.toLowerCase(), value])),
      });
      setSaving(false);
      setProcessedResult(res?.data?.data);
    }}
  >
    {(props) => (
      <Form className='process-form'>
        <div className='field-container'>
          <TextField
            fullWidth={true}
            className='field'
            id='template'
            name='template'
            placeholder='Template'
            value={props.values.template}
            onChange={event => props.setFieldValue('template', event.target.value)}
          />
        </div>
        <ParamsList
          params={tplParams}
          onAdd={() => setTplParams([...tplParams, {key: '', value: ''}])}
          onRemove={(index) => setTplParams(tplParams.filter((val, idx) => index !== idx))}
          onValueChange={(index, value) => {
            tplParams[index].value = value;
            setTplParams([...tplParams]);
          }}
          onKeyChange={(index, value) => {
            tplParams[index].key = value;
            setTplParams([...tplParams]);
          }}
        />
        <Button
          className='button'
          type='submit'
          variant='contained'
          color='primary'
          disabled={saving}
        >
          {!saving && 'Process'}
          <BeatLoader
            css='position:absolute'
            size={10}
            color={"#ffffff"}
            loading={saving}
          />
        </Button>
        {processedResult && <div className='processed-template'>Result: {processedResult}</div>}
      </Form>
    )}
  </Formik>
}