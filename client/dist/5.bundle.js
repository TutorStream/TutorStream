(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./client/src/components/protected/Settings.jsx":
/*!******************************************************!*\
  !*** ./client/src/components/protected/Settings.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\nvar _axios2 = _interopRequireDefault(_axios);\n\nvar _reactBootstrap = __webpack_require__(/*! react-bootstrap */ \"./node_modules/react-bootstrap/es/index.js\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Settings = function (_Component) {\n  _inherits(Settings, _Component);\n\n  function Settings() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Settings);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Settings.__proto__ || Object.getPrototypeOf(Settings)).call.apply(_ref, [this].concat(args))), _this), _this.state = {\n      tests: [],\n      test: '',\n      name: '',\n      bio: '',\n      tutorBio: '',\n      submitted: false,\n      selectedTests: [],\n      price: '',\n      isTutor: false,\n      preSelected: [],\n      photo: '',\n      selectedFile: null\n    }, _this.getAllTests = function () {\n      _axios2.default.get('/tests').then(function (_ref2) {\n        var data = _ref2.data;\n\n        _this.setState({\n          tests: data\n        });\n      }).catch(function (err) {\n        console.error('There was an error getting all the tests: ', err);\n      });\n    }, _this.handleCheck = function (e) {\n      var array = _this.state.selectedTests.slice();\n      if (array.indexOf(Number(e.target.value)) === -1) {\n        _this.setState({\n          selectedTests: [].concat(_toConsumableArray(_this.state.selectedTests), [e.target.value])\n        }, function () {\n          return console.log(_this.state.selectedTests);\n        });\n      } else {\n        var idx = array.indexOf(Number(e.target.value));\n        console.log('idx', idx);\n        array.splice(idx, 1);\n        _this.setState({\n          selectedTests: array\n        }, function () {\n          return console.log(_this.state.selectedTests);\n        });\n      }\n    }, _this.handleChange = function (event) {\n      _this.setState(_defineProperty({}, event.target.name, event.target.value));\n    }, _this.isPreselectedTests = function (id) {\n      if (_this.state.selectedTests.indexOf(id) !== -1) {\n        return true;\n      } else {\n        return false;\n      }\n    }, _this.handleSubmit = function (event) {\n      event.preventDefault();\n      var testsArray = [];\n      _this.state.selectedTests.forEach(function (test_id) {\n        testsArray.push({\n          tutor_id: _this.props.id,\n          test_id: test_id\n        });\n      });\n\n      var form = {\n        tests: testsArray,\n        tutorBio: _this.state.tutorBio,\n        rate: Number(_this.state.price),\n        id: _this.props.id,\n        userBio: _this.state.bio,\n        name: _this.state.name,\n        isTutor: _this.state.isTutor\n      };\n\n      _axios2.default.post('/users/' + _this.props.id, form).then(function () {\n        _this.handleFileUpload(_this.props.id);\n      }).then(function () {\n        _this.setState({\n          selectedFile: null,\n          submitted: true\n        });\n      }).catch(function (err) {\n        return console.error(err);\n      });\n    }, _this.handleFileSelect = function (e) {\n      _this.setState({\n        selectedFile: e.target.files\n      });\n    }, _this.handleFileUpload = function (user_id) {\n      var formData = new FormData();\n      formData.append('file', _this.state.selectedFile[0]);\n      _axios2.default.post('http://ec2-34-207-66-224.compute-1.amazonaws.com:5000/photo-upload', formData, {\n        headers: {\n          'Content-Type': 'multipart/form-data',\n          crossDomain: true\n        }\n      }).then(function (_ref3) {\n        var data = _ref3.data;\n\n        var userPhoto = {\n          user_id: user_id,\n          location: data.Location\n        };\n        _axios2.default.post('/users/photo', userPhoto);\n      }).catch(function (error) {\n        return console.error('There was an error with the POST request to the server: ', error);\n      });\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(Settings, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      var id = this.props.id;\n\n      var info = void 0;\n      _axios2.default.get('/users/info/' + id).then(function (_ref4) {\n        var data = _ref4.data;\n\n        info = data[0];\n        _this2.setState({\n          id: info.id,\n          name: info.Name,\n          bio: info.Bio\n        });\n      }).then(function () {\n        _this2.getAllTests();\n        if (info.Tutor === 1) {\n          _this2.setState({\n            isTutor: true\n          });\n          _axios2.default.get('/tutors/' + id).then(function (_ref5) {\n            var data = _ref5.data;\n\n            info = data;\n            var preselected = [];\n            info.tests.forEach(function (test) {\n              preselected.push(test.id);\n            });\n            _this2.setState({\n              tutorBio: info.Bio,\n              price: info.Price,\n              selectedTests: preselected\n            });\n          });\n        }\n      }).then(function () {\n        return _axios2.default.get('/users/photo', {\n          params: {\n            user_id: _this2.props.id\n          }\n        });\n      }).then(function (_ref6) {\n        var data = _ref6.data;\n\n        var newData = void 0;\n        if (!data[0]) {\n          newData = '';\n        } else {\n          newData = data[0].location;\n        }\n        _this2.setState({\n          photo: newData\n        });\n      }).catch(function (err) {\n        console.error(\"There was an error getting the user's settings: \", err);\n      });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this3 = this;\n\n      var conditionalDisplay = !this.state.isTutor ? _react2.default.createElement('div', null) : _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          'h2',\n          null,\n          'Tutor settings '\n        ),\n        _react2.default.createElement(\n          _reactBootstrap.FormGroup,\n          { controlId: 'formControlsTextarea' },\n          _react2.default.createElement(\n            _reactBootstrap.ControlLabel,\n            null,\n            'Tutor Bio'\n          ),\n          _react2.default.createElement(_reactBootstrap.FormControl, {\n            componentClass: 'textarea',\n            placeholder: 'Enter text (Max: 255 characters)',\n            name: 'tutorBio',\n            value: this.state.tutorBio,\n            onChange: this.handleChange\n          })\n        ),\n        _react2.default.createElement(\n          _reactBootstrap.FormGroup,\n          { controlId: 'formControlsTextarea' },\n          _react2.default.createElement(\n            _reactBootstrap.ControlLabel,\n            null,\n            'Rate: (hourly)'\n          ),\n          _react2.default.createElement(_reactBootstrap.FormControl, {\n            type: 'number',\n            placeholder: this.state.price,\n            name: 'price',\n            value: this.state.price,\n            onChange: this.handleChange\n          })\n        ),\n        _react2.default.createElement(\n          _reactBootstrap.FormGroup,\n          null,\n          this.state.tests.map(function (test, i) {\n            return _react2.default.createElement(\n              _reactBootstrap.Checkbox,\n              {\n                onChange: _this3.handleCheck,\n                inline: true,\n                key: i,\n                value: Number(test.id),\n                checked: _this3.isPreselectedTests(test.id) ? 'checked' : undefined\n              },\n              test.Name\n            );\n          })\n        )\n      );\n\n      if (this.state.submitted) {\n        return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/findTutor' });\n      }\n\n      return _react2.default.createElement(\n        'div',\n        { className: 'settings' },\n        _react2.default.createElement(\n          'h1',\n          null,\n          'Settings'\n        ),\n        _react2.default.createElement('br', null),\n        _react2.default.createElement(\n          'div',\n          { className: 'image-settings' },\n          _react2.default.createElement('img', {\n            className: 'img-circle',\n            src: this.state.photo,\n            alt: this.state.name + '\\'s profile picture'\n          })\n        ),\n        _react2.default.createElement(\n          _reactBootstrap.FormGroup,\n          { controlId: 'formControlsTextarea' },\n          _react2.default.createElement(\n            _reactBootstrap.ControlLabel,\n            null,\n            'Name'\n          ),\n          _react2.default.createElement(_reactBootstrap.FormControl, {\n            maxLength: '255',\n            componentClass: 'textarea',\n            placeholder: 'Enter text (Max: 255 characters)',\n            name: 'name',\n            readonly: 'readonly',\n            value: this.state.name,\n            onChange: this.handleChange\n          })\n        ),\n        _react2.default.createElement(\n          _reactBootstrap.FormGroup,\n          { controlId: 'formControlsTextarea' },\n          _react2.default.createElement(\n            _reactBootstrap.ControlLabel,\n            null,\n            'Bio'\n          ),\n          _react2.default.createElement(_reactBootstrap.FormControl, {\n            componentClass: 'textarea',\n            placeholder: 'Enter text (Max: 255 characters)',\n            name: 'bio',\n            value: this.state.bio,\n            onChange: this.handleChange\n          })\n        ),\n        _react2.default.createElement('br', null),\n        _react2.default.createElement(\n          _reactBootstrap.FormGroup,\n          { controlId: 'formControlsFile', encType: 'multipart/form-data' },\n          _react2.default.createElement(\n            _reactBootstrap.ControlLabel,\n            null,\n            'Update your profile picture :'\n          ),\n          _react2.default.createElement(_reactBootstrap.FormControl, {\n            type: 'file',\n            name: 'photo',\n            onChange: this.handleFileSelect\n          })\n        ),\n        _react2.default.createElement(\n          'h1',\n          null,\n          '_____________'\n        ),\n        conditionalDisplay,\n        _react2.default.createElement('br', null),\n        _react2.default.createElement(\n          _reactBootstrap.Button,\n          { bsStyle: 'success', type: 'submit', onClick: this.handleSubmit },\n          'Submit'\n        )\n      );\n    }\n  }]);\n\n  return Settings;\n}(_react.Component);\n\nexports.default = Settings;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvcHJvdGVjdGVkL1NldHRpbmdzLmpzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9jbGllbnQvc3JjL2NvbXBvbmVudHMvcHJvdGVjdGVkL1NldHRpbmdzLmpzeD84NjhkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHtcbiAgRm9ybUdyb3VwLFxuICBDb250cm9sTGFiZWwsXG4gIEZvcm1Db250cm9sLFxuICBDaGVja2JveCxcbiAgQnV0dG9uXG59IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBTZXR0aW5ncyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIHRlc3RzOiBbXSxcbiAgICB0ZXN0OiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBiaW86ICcnLFxuICAgIHR1dG9yQmlvOiAnJyxcbiAgICBzdWJtaXR0ZWQ6IGZhbHNlLFxuICAgIHNlbGVjdGVkVGVzdHM6IFtdLFxuICAgIHByaWNlOiAnJyxcbiAgICBpc1R1dG9yOiBmYWxzZSxcbiAgICBwcmVTZWxlY3RlZDogW10sXG4gICAgcGhvdG86ICcnLFxuICAgIHNlbGVjdGVkRmlsZTogbnVsbFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGluZm87XG4gICAgYXhpb3NcbiAgICAgIC5nZXQoYC91c2Vycy9pbmZvLyR7aWR9YClcbiAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICBpbmZvID0gZGF0YVswXTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgaWQ6IGluZm8uaWQsXG4gICAgICAgICAgbmFtZTogaW5mby5OYW1lLFxuICAgICAgICAgIGJpbzogaW5mby5CaW9cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmdldEFsbFRlc3RzKCk7XG4gICAgICAgIGlmIChpbmZvLlR1dG9yID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc1R1dG9yOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXhpb3MuZ2V0KGAvdHV0b3JzLyR7aWR9YCkudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICAgIGluZm8gPSBkYXRhO1xuICAgICAgICAgICAgdmFyIHByZXNlbGVjdGVkID0gW107XG4gICAgICAgICAgICBpbmZvLnRlc3RzLmZvckVhY2godGVzdCA9PiB7XG4gICAgICAgICAgICAgIHByZXNlbGVjdGVkLnB1c2godGVzdC5pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICB0dXRvckJpbzogaW5mby5CaW8sXG4gICAgICAgICAgICAgIHByaWNlOiBpbmZvLlByaWNlLFxuICAgICAgICAgICAgICBzZWxlY3RlZFRlc3RzOiBwcmVzZWxlY3RlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy91c2Vycy9waG90bycsIHtcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIHVzZXJfaWQ6IHRoaXMucHJvcHMuaWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICBsZXQgbmV3RGF0YTtcbiAgICAgICAgaWYgKCFkYXRhWzBdKSB7XG4gICAgICAgICAgbmV3RGF0YSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld0RhdGEgPSBkYXRhWzBdLmxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHBob3RvOiBuZXdEYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIGdldHRpbmcgdGhlIHVzZXIncyBzZXR0aW5nczogXCIsIGVycik7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldEFsbFRlc3RzID0gKCkgPT4ge1xuICAgIGF4aW9zXG4gICAgICAuZ2V0KCcvdGVzdHMnKVxuICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHRlc3RzOiBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdUaGVyZSB3YXMgYW4gZXJyb3IgZ2V0dGluZyBhbGwgdGhlIHRlc3RzOiAnLCBlcnIpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2hlY2sgPSBlID0+IHtcbiAgICB2YXIgYXJyYXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkVGVzdHMuc2xpY2UoKTtcbiAgICBpZiAoYXJyYXkuaW5kZXhPZihOdW1iZXIoZS50YXJnZXQudmFsdWUpKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZFRlc3RzOiBbLi4udGhpcy5zdGF0ZS5zZWxlY3RlZFRlc3RzLCBlLnRhcmdldC52YWx1ZV1cbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gY29uc29sZS5sb2codGhpcy5zdGF0ZS5zZWxlY3RlZFRlc3RzKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGlkeCA9IGFycmF5LmluZGV4T2YoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSk7XG4gICAgICBjb25zb2xlLmxvZygnaWR4JywgaWR4KTtcbiAgICAgIGFycmF5LnNwbGljZShpZHgsIDEpO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHNlbGVjdGVkVGVzdHM6IGFycmF5XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IGNvbnNvbGUubG9nKHRoaXMuc3RhdGUuc2VsZWN0ZWRUZXN0cylcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgW2V2ZW50LnRhcmdldC5uYW1lXTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH07XG5cbiAgaXNQcmVzZWxlY3RlZFRlc3RzID0gKGlkKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRUZXN0cy5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVN1Ym1pdCA9IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB0ZXN0c0FycmF5ID0gW107XG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFRlc3RzLmZvckVhY2godGVzdF9pZCA9PiB7XG4gICAgICB0ZXN0c0FycmF5LnB1c2goe1xuICAgICAgICB0dXRvcl9pZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgICAgdGVzdF9pZFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB2YXIgZm9ybSA9IHtcbiAgICAgIHRlc3RzOiB0ZXN0c0FycmF5LFxuICAgICAgdHV0b3JCaW86IHRoaXMuc3RhdGUudHV0b3JCaW8sXG4gICAgICByYXRlOiBOdW1iZXIodGhpcy5zdGF0ZS5wcmljZSksXG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIHVzZXJCaW86IHRoaXMuc3RhdGUuYmlvLFxuICAgICAgbmFtZTogdGhpcy5zdGF0ZS5uYW1lLFxuICAgICAgaXNUdXRvcjogdGhpcy5zdGF0ZS5pc1R1dG9yXG4gICAgfTtcblxuICAgIGF4aW9zXG4gICAgICAucG9zdChgL3VzZXJzLyR7dGhpcy5wcm9wcy5pZH1gLCBmb3JtKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZUZpbGVVcGxvYWQodGhpcy5wcm9wcy5pZCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBzZWxlY3RlZEZpbGU6IG51bGwsXG4gICAgICAgICAgc3VibWl0dGVkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgfTtcblxuICBoYW5kbGVGaWxlU2VsZWN0ID0gZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEZpbGU6IGUudGFyZ2V0LmZpbGVzXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlRmlsZVVwbG9hZCA9IHVzZXJfaWQgPT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgdGhpcy5zdGF0ZS5zZWxlY3RlZEZpbGVbMF0pO1xuICAgIGF4aW9zXG4gICAgICAucG9zdChcbiAgICAgICAgJ2h0dHA6Ly9lYzItMzQtMjA3LTY2LTIyNC5jb21wdXRlLTEuYW1hem9uYXdzLmNvbTo1MDAwL3Bob3RvLXVwbG9hZCcsXG4gICAgICAgIGZvcm1EYXRhLFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcbiAgICAgICAgICAgIGNyb3NzRG9tYWluOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgbGV0IHVzZXJQaG90byA9IHtcbiAgICAgICAgICB1c2VyX2lkLFxuICAgICAgICAgIGxvY2F0aW9uOiBkYXRhLkxvY2F0aW9uXG4gICAgICAgIH07XG4gICAgICAgIGF4aW9zLnBvc3QoJy91c2Vycy9waG90bycsIHVzZXJQaG90byk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgJ1RoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHRoZSBQT1NUIHJlcXVlc3QgdG8gdGhlIHNlcnZlcjogJyxcbiAgICAgICAgICBlcnJvclxuICAgICAgICApXG4gICAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29uZGl0aW9uYWxEaXNwbGF5ID0gIXRoaXMuc3RhdGUuaXNUdXRvciA/IChcbiAgICAgIDxkaXYgLz5cbiAgICApIDogKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyPlR1dG9yIHNldHRpbmdzIDwvaDI+XG5cbiAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJmb3JtQ29udHJvbHNUZXh0YXJlYVwiPlxuICAgICAgICAgIDxDb250cm9sTGFiZWw+VHV0b3IgQmlvPC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICBjb21wb25lbnRDbGFzcz1cInRleHRhcmVhXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGV4dCAoTWF4OiAyNTUgY2hhcmFjdGVycylcIlxuICAgICAgICAgICAgbmFtZT1cInR1dG9yQmlvXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnR1dG9yQmlvfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwiZm9ybUNvbnRyb2xzVGV4dGFyZWFcIj5cbiAgICAgICAgICA8Q29udHJvbExhYmVsPlJhdGU6IChob3VybHkpPC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnN0YXRlLnByaWNlfVxuICAgICAgICAgICAgbmFtZT1cInByaWNlXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaWNlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAge3RoaXMuc3RhdGUudGVzdHMubWFwKCh0ZXN0LCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja31cbiAgICAgICAgICAgICAgICBpbmxpbmVcbiAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgdmFsdWU9e051bWJlcih0ZXN0LmlkKX1cbiAgICAgICAgICAgICAgICBjaGVja2VkPXtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcmVzZWxlY3RlZFRlc3RzKHRlc3QuaWQpID8gJ2NoZWNrZWQnIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3Rlc3QuTmFtZX1cbiAgICAgICAgICAgICAgPC9DaGVja2JveD5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGlmICh0aGlzLnN0YXRlLnN1Ym1pdHRlZCkge1xuICAgICAgcmV0dXJuIDxSZWRpcmVjdCB0bz1cIi9maW5kVHV0b3JcIiAvPjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXR0aW5nc1wiPlxuICAgICAgICA8aDE+U2V0dGluZ3M8L2gxPlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbWFnZS1zZXR0aW5nc1wiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImltZy1jaXJjbGVcIlxuICAgICAgICAgICAgc3JjPXt0aGlzLnN0YXRlLnBob3RvfVxuICAgICAgICAgICAgYWx0PXtgJHt0aGlzLnN0YXRlLm5hbWV9J3MgcHJvZmlsZSBwaWN0dXJlYH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cImZvcm1Db250cm9sc1RleHRhcmVhXCI+XG4gICAgICAgICAgPENvbnRyb2xMYWJlbD5OYW1lPC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICBtYXhMZW5ndGg9XCIyNTVcIlxuICAgICAgICAgICAgY29tcG9uZW50Q2xhc3M9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHRleHQgKE1heDogMjU1IGNoYXJhY3RlcnMpXCJcbiAgICAgICAgICAgIG5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgIHJlYWRvbmx5PVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cImZvcm1Db250cm9sc1RleHRhcmVhXCI+XG4gICAgICAgICAgPENvbnRyb2xMYWJlbD5CaW88L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgIGNvbXBvbmVudENsYXNzPVwidGV4dGFyZWFcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0ZXh0IChNYXg6IDI1NSBjaGFyYWN0ZXJzKVwiXG4gICAgICAgICAgICBuYW1lPVwiYmlvXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmJpb31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJmb3JtQ29udHJvbHNGaWxlXCIgZW5jVHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIj5cbiAgICAgICAgICA8Q29udHJvbExhYmVsPlVwZGF0ZSB5b3VyIHByb2ZpbGUgcGljdHVyZSA6PC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICBuYW1lPVwicGhvdG9cIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsZVNlbGVjdH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICA8aDE+X19fX19fX19fX19fXzwvaDE+XG5cbiAgICAgICAge2NvbmRpdGlvbmFsRGlzcGxheX1cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIDxCdXR0b24gYnNTdHlsZT1cInN1Y2Nlc3NcIiB0eXBlPVwic3VibWl0XCIgb25DbGljaz17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICAgIFN1Ym1pdFxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3M7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQU1BO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVpBO0FBd0VBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFEQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFEQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBR0E7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQU9BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBTUE7Ozs7O0FBNUtBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBRUE7QUFDQTtBQUNBOzs7QUF3SEE7QUFBQTtBQUNBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUZBO0FBV0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBRkE7QUFXQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVNBO0FBVEE7QUFZQTtBQWZBO0FBekJBO0FBQ0E7QUE0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBREE7QUFRQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBRkE7QUFhQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQVdBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQVNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWpEQTtBQXNEQTs7OztBQTFTQTtBQUNBO0FBNFNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./client/src/components/protected/Settings.jsx\n");

/***/ })

}]);