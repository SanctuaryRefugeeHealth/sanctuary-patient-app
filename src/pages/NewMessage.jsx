import React from "react";
import { Button, InputLabel, Select, MenuItem } from '@material-ui/core';
import { getTemplates, getLanguages } from '../services';


class NewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      templates: [],
      message: {
        languageId: '',
        templateId: ''
      }
    }
  }

  async componentDidMount() {
    const languages = await getLanguages();
    const templates = await getTemplates();
    this.setState({
      languages,
      templates,
      message: {
        ...this.state.message,
        languageId: (languages[0]) ? languages[0].id : '1',
        templateId: (templates[0]) ? templates[0].templateId : '1'
      }
    });
  }

  updateSelect = (e) => {
    this.setState({
      message: {
        ...this.state.message,
        [e.target.name]: e.target.value
      }
    });
  }

  displayMessage() {
    const { templates, message } = this.state;
    return templates.find(tpl => tpl.templateId === message.templateId)[message.languageId];
  }

  createNewMessage = (e) => {
    e.preventDefault();
    console.log('Submitted?')
  }

  render() {
    const { message, languages, templates } = this.state;
    return <div>
      <form onSubmit={this.createNewMessage} style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <InputLabel id="language">Language</InputLabel>
          <Select labelId="language" name="languageId" value={message.languageId} onChange={this.updateSelect}>
            {languages.map(lang => (
              <MenuItem value={lang.id} key={lang.id}>{lang.name}</MenuItem>
            ))}
          </Select>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <InputLabel id="template">Template</InputLabel>
          <Select labelId="template" name="templateId" value={message.templateId} onChange={this.updateSelect}>
            {templates.map(tpl => (
              <MenuItem value={tpl.templateId} key={tpl.templateId}>{tpl.templateName}</MenuItem>
            ))}
          </Select>
        </div>
        {message.templateId && message.languageId && (
          <div style={{ border: 'solid 1px #ccc', padding: '1rem', marginBottom: '1.5rem' }}>
            {this.displayMessage()}
          </div>
        )}
        <div>
          <Button variant="contained" color="primary" type="submit">Send Message</Button>
        </div>
      </form>
    </div>
  }
}

export default NewMessage;
