import React, { Component } from 'react';
import firebase from 'firebase';
import ColorPickerH1 from './ColorPickerH1';
import ColorPickerH2 from './ColorPickerH2';


const dbRef = firebase.database().ref();
let timeout = '';

class ToolsText extends Component {
  constructor (){
    super();
    this.state = {
        h2: {
          textContent: "",
          size: 40,
          fontFamily: "Roboto",
          color: "#fff",
          alignment: "center",
          isInvalid: false

        },
        h1: {
            textContent: "",
            size: 60,
            fontFamily: "Roboto",
            color: "#fff",
            alignment: "center",
            isInvalid: false
        
      }
    }
  }
 
  renderFonts = (property) => {
    const fontsArray = ['Karla',
      'Lora',
      'Frank Ruhl Libre',
      'Playfair Display',
      'Archivo',
      'Spectral',
      'Rakkas',
      'Concert One',
      'Yatra One',
      'Arvo',
      'Lato',
      'Abril FatFace',
      'Ubuntu',
      'PT Serif',
      'Old Standard TT',
      'Oswald',
      'PT Sans',
      'Poppins',
      'Fira Sans',
      'Open Sans',
      'Roboto',
      'Dosis'];
      return fontsArray.map((font,i) => {
        let dbFont = font;
        return (<option selected={this.state[property].fontFamily === font ? true : false} value={dbFont} key={i}>{font}</option> )
      })
} 

  handleNumberChange = (e) => {
    // only run code after user is done typing
    // user done typing, 300ms after e
    clearTimeout(timeout);
    const userID = this.props.user;

    const newState = JSON.parse(JSON.stringify(this.state));
    const temp = e.target.id.split('.')
    console.log(temp)
    const header = temp[0];
    const property = temp[1];

    newState[header][property] = e.target.value;

 
      timeout = setTimeout(() => this.validFontSize(header,property), 1000);
    this.setState(
      newState, () => {
        const dbRef = firebase.database().ref(`${userID}/text`);
        dbRef.on('value', snapshot => {
          dbRef.update(this.state)
        })

      })
    
  }

  validFontSize = (header,property) => {
    const userID = this.props.user;
    const newState = JSON.parse(JSON.stringify(this.state));
    console.log(header,property);
    switch (true) {
      case this.state[header][property] < 15:
        console.log('less than 15')
        newState[header][property] = 15;
        break;
      case this.state[header][property] > 60:
        console.log('more than 60')
        newState[header][property] = 60;
        break;
      default:
        console.log('between 15 and 60')
        newState[header][property] = this.state[header][property]
    }
    this.setState(
      newState, () => {
        const dbRef = firebase.database().ref(`${userID}/text`);
        dbRef.on('value', snapshot => {
          dbRef.update(this.state)
        })

      })
  }
  
  handleChange = (e) => {
    // console.log('handle change fired')
    // if font-size < 15 || font-size > 60, setState to display error
    // else change bottom border to accent color
    const userID = this.props.user;
    
    const newState = JSON.parse(JSON.stringify(this.state));
    const temp=e.target.id.split('.');
    const header=temp[0];
    const property=temp[1];

    newState[header][property] = e.target.value;

    this.setState(
      newState,() => {
      const dbRef = firebase.database().ref(`${userID}/text`);
      dbRef.on('value', snapshot => {
        dbRef.update(this.state)
      })
    })
    // console.log(e.target.value);
    
    // if (e.target.value < 15 || e.target.value > 60) {
    //   newState[header].isInvalid = true;
    //   this.setState(newState);
    // }
    // else {
    //   newState[header].isInvalid = false;
    //   this.setState(newState);
    // }
  }
  getColorh1 = (color) => {
    const h1color = color.hex;
    const dbRef = firebase.database().ref(this.props.user)
    console.log(`toolstext`, h1color);
    dbRef.child("text").child("h1color").update(color)
    
  }
  getColorh2 = (color) => {
    const h2color = color.hex;
    const dbRef = firebase.database().ref(this.props.user)
    console.log(`toolstext`, h2color);
    dbRef.child("text").child("h2color").update(color) 

  }
  handleChangeComplete = (color) => {
    console.log(`handlechange`, color);
  };
  handleChangeComplete = (color) => {
    console.log(`handlechange`, color);
  };
    componentDidMount() {
      const userID = this.props.user;
      const dbH1Ref = firebase.database().ref(`${userID}/text`);
      dbH1Ref.on('value',(snapshot) => {
        this.setState(snapshot.val());
      //  const dbH1 = {h1:snapshot.val()};
        
        // console.log(snapshot.val());
        
        // const initialState = 
      })
      // console.log(dbH1);

    }
    render() {
        return (
        <div className="tools tools__container tools__container--text">
            <h3>Style your text</h3>
            {/* <h2>{this.props.text.h2.color}</h2> */}
            <form class="clearfix">
              <div className="tools__container--text__h1">
                <h3 className="tools__container--text__header" id="headerh1">
                  Main header
                </h3>
                <div className="tools__container__wrapper">
                  <input onChange={this.handleChange} value={this.state.h1.textContent} id="h1.textContent" required type="text"  className="tools__container__input" maxLength="25" />
                  <label htmlFor="h1Text" className="tools__container__label">Enter text</label>
                </div>

                <div className="tools__container__wrapper">
                  <input onChange={this.handleNumberChange} value={this.state.h1.size} id='h1.size' required type="number" max="60" min="15" className="tools__container__input"   />
                  <label htmlFor="h1FontSize" className="tools__container__label">
                      Font size
                    </label>
                  {this.state.h1.isInvalid && (
                    <label>invalid</label>
                  )}
                </div>

                <div className="tools__container__wrapper">
                  <label htmlFor="h1FontFamily" >
                      Font family
                  </label>
                  <select onChange={this.handleChange} id="h1.fontFamily" value={this.state.h1.fontFamily}>
                    {this.renderFonts('h1')}
                  </select>
                </div>

                <div className="tools__container__wrapper">
                  <label htmlFor="h1TextAlign" >
                      Text alignment
                  </label>
                  <select onChange={this.handleChange} id="h1.alignment">
                    <option selected={this.state.h1.alignment === "left" ? true : false} value="left">left</option>
                    <option selected={this.state.h1.alignment === "center" ? true : false} value="center">center</option>
                    <option selected={this.state.h1.alignment === "right" ? true : false} value="right">right</option>
                  </select>
                </div>
                <div className="tools__container__colorPicker">
                  <ColorPickerH1 color={this.state.h1.Color} onChangeComplete={this.handleChangeComplete} getColorh1={this.getColorh1}/>
                </div>
              </div>
              

              <div className="tools__container--text__h2">
                <h3 className="tools__container--text__header">Subheader</h3>

              <div className="tools__container__wrapper">
                  <input required onChange={this.handleChange} id="h2.textContent" value={this.state.h2.textContent} type="text" className="tools__container__input" maxLength="25"  />
                <label htmlFor="h2Text" className="tools__container__label">Enter text</label>
              </div>

              <div className="tools__container__wrapper">
                <input required onChange={this.handleNumberChange} id="h2.size" value={this.state.h2.size} type="number" min="15" max="60" className="tools__container__input" />
                <label htmlFor="h2FontSize" className="tools__container__label">
                    Font size
                  </label>
              </div>

              <div className="tools__container__wrapper">
                <label htmlFor="h2FontFamily">
                    Font family
                </label>
                <select onChange={this.handleChange} id="h2.fontFamily">
                  {this.renderFonts('h2')}
                </select>
              </div>

              <div className="tools__container__wrapper">
                <label htmlFor="h2TextAlign">
                    Text alignment
                </label>
                <select onChange={this.handleChange} id="h2.alignment">
                    <option selected={this.state.h2.alignment === "left" ? true : false} value="left">left</option>
                    <option selected={this.state.h2.alignment === "center" ? true : false} value="center">center</option>
                    <option selected={this.state.h2.alignment === "right" ? true : false} value="right">right</option>
                </select>
              </div>
                <div className="tools__container__colorPicker">
                  <ColorPickerH2 color={this.state.h2.Color} onChangeComplete={this.handleChangeComplete} getColorh2={this.getColorh2} />
                </div>
              </div>
            </form>
        </div>)
        }
}

export default ToolsText;