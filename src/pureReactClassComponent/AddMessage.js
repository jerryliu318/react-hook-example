
import React from 'react';
import PropTypes from 'prop-types';

// const replaceKeyWord = (str) => {
//   const keyWord = ['shit', 'fuck', 'bitch'];
//   const regStr = keyWord.reduce((acc, current, index) => {
//     if (index === 1) {
//       return `\\s${acc}\\s|\\s${current}\\s`;
//     }
//     return `${acc}|\\s${current}\\s`;
//   });
//   const filterRegex = new RegExp(regStr, 'gi');

//   return str.replace(filterRegex, ' * ');
// };

export default class AddMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  onChangeInput = (e) => {
    const text = e.target.value;
    this.setState({ input: text });
  }

  onAddMessage = () => {
    const { onAddMessage } = this.props;
    const { input } = this.state;
    onAddMessage(input);
    this.setState({ input: '' });
  }

  render() {
    const { input } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="input-group">
              {/* <div className="input-group-prepend">
                <span className="input-group-text">訊息</span>
              </div> */}
              <input id="msg" type="text" className="form-control shadow-none" name="msg" placeholder="寫點東西...." value={input} onChange={this.onChangeInput} />
              <div className="input-group-append">
                <button type="button" className="btn btn-primary shadow-none" onClick={this.onAddMessage}>送出</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddMessage.propTypes = {
  onAddMessage: PropTypes.func.isRequired,
};
