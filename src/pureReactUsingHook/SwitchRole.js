
import React from 'react';
import PropTypes from 'prop-types';

export default class SwitchRole extends React.Component {
  onChangeRole = (e) => {
    const role = e.target.id;
    const { onChangeRole } = this.props;
    onChangeRole(role);
  }

  render() {
    const { role } = this.props;
    return (
      <div className="container mb-3">
        <div className="row">
          <div className="col-3 d-flex align-items-center">
            <h6 className="text-center">切換留言使用者</h6>
          </div>
          <div className="col-3">
            <button
              id="user1"
              type="button"
              className={role === 'user1' ? 'btn btn-info btn-block' : 'btn btn-outline-info btn-block'}
              onClick={this.onChangeRole}
            >
              使用者1
            </button>
          </div>
          <div className="col-3">
            <button
              id="user2"
              type="button"
              className={role === 'user2' ? 'btn btn-info btn-block' : 'btn btn-outline-info btn-block'}
              onClick={this.onChangeRole}
            >
              使用者2
            </button>
          </div>
          <div className="col-3">
            <button
              id="user3"
              type="button"
              className={role === 'user3' ? 'btn btn-info btn-block' : 'btn btn-outline-info btn-block'}
              onClick={this.onChangeRole}
            >
              使用者3
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SwitchRole.propTypes = {
  role: PropTypes.string.isRequired,
  onChangeRole: PropTypes.func.isRequired,
};
