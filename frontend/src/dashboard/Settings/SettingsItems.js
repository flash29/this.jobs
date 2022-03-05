import './Settings.css'

function SettingsItems(props) {

    return (
          <div className='SettingsItemDisplayBox' >
              {props.itemname}
          </div>
    );
  }
  
  export default SettingsItems;