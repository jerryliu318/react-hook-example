
import React from 'react';
import PropTypes from 'prop-types';

export default class AddReply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  onChangeInput = (e) => {
    this.setState({ input: e.target.value });
  }

  onAddReply = () => {
    const { onAddReply } = this.props;
    const { input } = this.state;
    onAddReply(input);
    this.setState({ input: '' });
  }

  render() {
    const { input } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 offset-1">
            <div className="input-group">
              <input id="msg" type="text" className="form-control shadow-none" name="msg" placeholder="寫點東西...." value={input} onChange={this.onChangeInput} />
              <div className="input-group-append">
                <button type="button" className="btn btn-info shadow-none" onClick={this.onAddReply}>回覆</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddReply.propTypes = {
  onAddReply: PropTypes.func.isRequired,
};
