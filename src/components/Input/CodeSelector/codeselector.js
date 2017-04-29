import React from 'react'
import IconButton from 'material-ui/IconButton'
import Up from 'material-ui/svg-icons/navigation/arrow-drop-up'
import Down from 'material-ui/svg-icons/navigation/arrow-drop-down'
import Toggle from 'material-ui/Toggle'

const style = {
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

const SubCode = ({
  name,
  code,
  prop,
  onIncrease,
  updateCode,
  showUp,
  showDown,
}) => {
  return (
    <div style={style.child}>
      {name}: {code[prop]}<br />
      {showUp &&
        <IconButton
          tooltip={`${name} erhöhen`}
          onTouchTap={() => {
            const newCode = onIncrease.reduce((o, e) => {
              o[e] = 1
              return o
            }, {})

            updateCode({
              ...code,
              ...newCode,
              [prop]: code[prop] + 1,
            })
          }}
        >
          <Up />
        </IconButton>}
      {showDown &&
        <IconButton
          disabled={code[prop] === 0}
          tooltip={`${name} verringern`}
          onTouchTap={() => {
            updateCode({
              ...code,
              [prop]: code[prop] - 1,
            })
          }}
        >
          <Down />
        </IconButton>}
    </div>
  )
}

const CodeSelector = props => {
  const { simpleFields, updateSimpleField } = props
  return (
    <div>
      <Toggle
        label="Sicheren Eingabemodus verwenden"
        toggled={!!simpleFields.codeUseSaveMode}
        onToggle={(o, useSaveMode) => {
          updateSimpleField('codeUseSaveMode', useSaveMode)
        }}
        style={{ width: 350 }}
      />
      <div style={style.container}>
        <SubCode
          name="Jahr"
          prop="year"
          {...props}
          onIncrease={['number', 'page', 'position']}
          showUp={true}
          showDown={true}
        />
        <SubCode
          name="Beleg"
          prop="number"
          {...props}
          onIncrease={['page', 'position']}
          showUp={true}
          showDown={!simpleFields.codeUseSaveMode}
        />
        <SubCode
          name="Seite"
          prop="page"
          {...props}
          onIncrease={['position']}
          showUp={true}
          showDown={!simpleFields.codeUseSaveMode}
        />
        <SubCode
          name="Position"
          prop="position"
          {...props}
          onIncrease={[]}
          showUp={!simpleFields.codeUseSaveMode}
          showDown={!simpleFields.codeUseSaveMode}
        />
      </div>
    </div>
  )
}

export default CodeSelector
