import React from 'react'
import IconButton from 'material-ui/IconButton';
import Up from 'material-ui/svg-icons/navigation/arrow-drop-up';
import Down from 'material-ui/svg-icons/navigation/arrow-drop-down';

const style= {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  child: {
    flex: '1',
    textAlign: 'center',
    display: 'inline-block',
  },
}

let SubCode = (props) => {
  return (
    <div style={style.child}>
      {props.name}: {props.code[props.prop]}<br />
      <IconButton
        tooltip={`${props.name} erhöhen`}
        onTouchTap={() => {

          let newCode = props.onIncrease.reduce((o, e) => {
            o[e] = 1
            return o
          }, {});

          props.updateCode({
            ...props.code,
            ...newCode,
            [props.prop]: props.code[props.prop] + 1,
          })
        }}
      >
        <Up />
      </IconButton>
      <IconButton
        disabled={props.code[props.prop] === 0}
        tooltip={`${props.name} verringern`}
        onTouchTap={() => {
          props.updateCode({
            ...props.code,
            [props.prop]: props.code[props.prop] - 1,
          })
        }}
      >
        <Down />
      </IconButton>
    </div>
  )
}

const CodeSelector = ({ code, updateCode }) => {
  const props = { code, updateCode }
  return (
    <div style={style.container} >
      <SubCode name="Jahr" prop="year" {...props} onIncrease={[ 'number', 'page', 'position' ]} />
      <SubCode name="Beleg" prop="number" {...props} onIncrease={[ 'page', 'position' ]} />
      <SubCode name="Seite" prop="page" {...props} onIncrease={[ 'position' ]} />
      <SubCode name="Position" prop="position" {...props} onIncrease={[  ]} />
    </div>
  )
}

export default CodeSelector
