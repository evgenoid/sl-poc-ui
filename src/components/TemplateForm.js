import axios from "axios";
import { Form, Formik } from "formik";
import { Button, FormControlLabel, Switch, TextField } from "@material-ui/core";
import { ParamsList } from "./ParamsList";
import React, { useState } from "react";
import { API_URL } from "../const/api";

export const TemplateForm = () => {
  const [emailTplParams, setEmailTplParams] = useState([]);

  return <Formik
    initialValues={{
      to: '',
      subject: '',
      text: '',
      isHTML: true,
      template: '',
      templateParams: {
      },
    }}
    onSubmit={async values => {
      await axios.post(`${API_URL}/emails/send`,{
        "isHtml": values.isHTML,
        "subject": values.subject,
        "template": values.template,
        "templateParams": Object.fromEntries(emailTplParams.map(({key, value}) => [key.toLowerCase(), value])),
        "text": values.text,
        "to": values.to
      });
    }}>
    {(props) => (
      <Form className='send-form'>
        <div className='field-container'>
          <TextField
            fullWidth={true}
            className='field'
            id='to'
            name='to'
            placeholder='Email*'
            value={props.values.to}
            onChange={event => props.setFieldValue('to', event.target.value)}
          />
        </div>
        <div className='field-container'>
          <TextField
            fullWidth={true}
            className='field'
            id='subject'
            name='subject'
            placeholder='Subject*'
            value={props.values.subject}
            onChange={event => props.setFieldValue('subject', event.target.value)}
          />
        </div>
        <div className='field-container'>
          <TextField
            fullWidth={true}
            className='field'
            id='text'
            name='text'
            placeholder='Text'
            value={props.values.text}
            onChange={event => props.setFieldValue('text', event.target.value)}
          />
          <div className='separator'>OR</div>
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
          params={emailTplParams}
          onAdd={() => setEmailTplParams([...emailTplParams, {key: '', value: ''}])}
          onRemove={(index) => setEmailTplParams(emailTplParams.filter((val, idx) => index !== idx))}
          onValueChange={(index, value) => {
            emailTplParams[index].value = value;
            setEmailTplParams([...emailTplParams]);
          }}
          onKeyChange={(index, value) => {
            emailTplParams[index].key = value;
            setEmailTplParams([...emailTplParams]);
          }}
        />
        <FormControlLabel
          className='field-container'
          labelPlacement='end'
          label='HTML'
          control={<Switch
            checked={props.values.isHTML}
            onChange={(event, val) => props.setFieldValue('isHTML',  val)}
            color="primary"
            name="isHtml"
          />}
        />
        <Button className='button' type='submit' variant='contained' color='primary'>
          Send
        </Button>
      </Form>
    )}
  </Formik>
}