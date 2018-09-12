import React, { Component } from 'react';
import firebase from '../../firebase';


class CSSView extends Component {

    constructor() {
        super();
        this.state = {
            user: "",
            userSelections: {
                background: {
                    backgroundColor: "",
                    user: ""
                },
                text: {
                    h2: {
                        size: null,
                        fontFamily: "",
                        color: "",
                        alignment: "",
                        textContent: ""

                    },
                    h1: {
                        size: null,
                        fontFamily: "",
                        color: "",
                        alignment: "",
                        textContent: ""

                    },
                    h1color: {
                        hex: ""
                    },
                    h2color: {
                        hex: ""
                    }
                },
                social: {
                    email: "",
                    github: "",
                    linkedin: "",
                    twitter: "",
                    user: ""
                }
            }
        }
    }
    componentDidMount = () => {
        const userID = this.props.user
        this.setState({
            user: userID
        }, () => {
            const dbRef = firebase.database().ref(this.state.user);
            dbRef.on('value', snapshot => {
                let dog = snapshot.val()
                console.log(`liveview`, snapshot.val());
                // if(snapshot.val()) {
                this.setState({
                    userSelections: dog
                    // {
                    //     background: snapshot.val().background,
                    //     text: snapshot.val().text,
                    //     social: snapshot.val().social
                    // }
                }, () => {
                    console.log(`setState`, this.state.userSelections);

                })
            })
        })
    }

    render() { 
        //BACKGROUND
        // const backgroundColor = this.state.userSelections.background.backgroundColor ? this.state.userSelections.background.backgroundColor : 'blue'
        
        // const backgroundPicture = this.state.userSelections.background.picture ? this.state.userSelections.background.picture : null

        const setBackground = this.state.userSelections.background.background ? this.state.userSelections.background.background : '#30b8b2'

        // HEADER ONE
        const headerOneColor = this.state.userSelections.text.h1color.hex ? this.state.userSelections.text.h1color.hex : 'white';
        const headerOneAlign = this.state.userSelections.text.h1.alignment ? this.state.userSelections.text.h1.alignment : 'center';
        const headerOneFontPre = this.state.userSelections.text.h1.fontFamily ? this.state.userSelections.text.h1.fontFamily : 'sans-serif';
        const headerOneFont = headerOneFontPre.split(' ').join('-');


        const headerOneSize = this.state.userSelections.text.h1.size ? `${this.state.userSelections.text.h1.size}px` : '35px';


        // HEADER TWO
        const headerTwoColor = this.state.userSelections.text.h2color.hex ? this.state.userSelections.text.h2color.hex : 'white';
        const headerTwoAlign = this.state.userSelections.text.h2.alignment ? this.state.userSelections.text.h2.alignment : 'center';
        const headerTwoFontPre = this.state.userSelections.text.h2.fontFamily ? this.state.userSelections.text.h2.fontFamily : 'serif';
        const headerTwoFont = headerTwoFontPre.split(' ').join('-');


        const headerTwoSize = this.state.userSelections.text.h2.size ? `${this.state.userSelections.text.h2.size}px` : '15px';


        // ICON ALLIGNMENT

        let leftValue;
        let iconTranslate;

        if (headerOneAlign === 'left') {
            iconTranslate = 'translateX(0%)'
            leftValue = '0%';
        }
        if (headerOneAlign === 'center') {
            iconTranslate = 'translate(-50%)'
            leftValue = '50%';
        }
        if (headerOneAlign === 'right') {
            iconTranslate = 'translateX(-100%)'
            leftValue = '100%';
        }



        return (
            <div className="view view__css">
                {/* background */}
                <div className="view__container">
                    <p className="view__css--class">{`.background`}<span className="view__css--element--start">{`{`}</span></p>
                    {/* {this.state.userSelections.background.picture && (
                        <p className="view__css--property">{`background : "${backgroundPicture}"`};</p>
                    )}
                    {!this.state.userSelections.background.picture && (   
                        <p className="view__css--property">{`background : ${backgroundColor}`};</p>
                    )} */}
                    <p className="view__css--property">{`background : ${setBackground}`}</p>
                    <p className="view__css--end">{`}`}</p>
                </div>
                {/* headerContainer */}
                <div className="view__container">
                    <p className="view__css--class">{`.headerContainer`}<span className="view__css--element--start">{`{`}</span></p>
                    <p className="view__css--property">{`position : absolute`};</p>
                    <p className="view__css--property">{`padding : 0 40px`};</p>
                    <p className="view__css--property">{`top : 50%`};</p>
                    <p className="view__css--property">{`left : 0`};</p>
                    <p className="view__css--property">{`right : 0`};</p>
                    <p className="view__css--property">{`transform : translateY(-50%)`};</p>
                    <p className="view__css--end">{`}`}</p>
                </div>
                {/* h1 */}
                <div className="view__container">
                    <p className="view__css--element">{`h1`}<span className="view__css--element--start">{`{`}</span></p>
                    <p className="view__css--property">{`color : ${headerOneColor};`}</p>
                    <p className="view__css--property">{`font-size : ${headerOneSize};`}</p>
                    <p className="view__css--property">{`font-family : "${headerOneFont}";`}</p>
                    <p className="view__css--property">{`text-align : ${headerOneAlign};`}</p>
                    <p className="view__css--end">{`}`}</p>
                </div>
                {/* h2 */}
                <div className="view__container">
                    <p className="view__css--element">{`h2`}<span className="view__css--element--start">{`{`}</span></p>
                    <p className="view__css--property">{`color : ${headerTwoColor};`}</p>
                    <p className="view__css--property">{`font-size : ${headerTwoSize};`}</p>
                    <p className="view__css--property">{`font-family : "${headerTwoFont}";`}</p>
                    <p className="view__css--property">{`text-align : ${headerTwoAlign};`}</p>
                    <p className="view__css--end">{`}`}</p>
                </div>
                {/* social */}
                <div className="view__container" >
                    <p className="view__css--class">{`.social`}<span className="view__css--element--start">{`{`}</span></p>
                    <p className="view__css--property">{`position : absolute`};</p>
                    <p className="view__css--property">{`left : 30px`};</p>
                    <p className="view__css--property">{`right : 30px`};</p>
                    <p className="view__css--property">{`bottom : 30px`};</p>
                    <p className="view__css--end">{`}`}</p>
                </div>
                {/* ul li */}
                <div className="view__container">
                    
                    <p className="view__css--element">{`ul`}<span>, </span>{`li`}<span className="view__css--element--start">{`{`}</span></p>
                    <p className="view__css--property">{`margin : 0px`};</p>
                    <p className="view__css--property">{`padding : 0px`};</p>
                    <p className="view__css--property">{`list-style : none`};</p>
                    <p className="view__css--property">{`float : left`};</p>
                    <p className="view__css--end">{`}`}</p>
                </div>
                {/* ul */}
                <div className="view__container">

                    <p className="view__css--element">{`ul`}<span className="view__css--element--start">{`{`}</span></p>
                    <p className="view__css--property">{`position : relative`};</p>
                    <p className="view__css--property">{`left : ${leftValue}`};</p>
                    <p className="view__css--property">{`transform : ${iconTranslate}`};</p>
                    <p className="view__css--end">{`}`}</p>
                </div>
                {/* li */}
                <div className="view__container">

                    <p className="view__css--element">{`li`}<span className="view__css--element--start">{`{`}</span></p>
                    <p className="view__css--property">{`margin : 10px`};</p>
                    <p className="view__css--end">{`}`}</p>
                </div>
                {/* icons */}
                <div className="view__container">
                    
                    <p className="view__css--element">{`i`}<span className="view__css--element--start">{`{`}</span></p>
                    <p className="view__css--property">{`color : ${headerOneColor}`};</p>
                   
                    <p className="view__css--end">{`}`}</p>
                </div>
                <div className="view__container">
                    
                    <p className="view__css--element">{`i`}<span className="view__css--add">:hover</span><span className="view__css--element--start">{`{`}</span></p>
                    <p className="view__css--property">{`color : ${headerTwoColor}`};</p>
                   
                    <p className="view__css--end">{`}`}</p>
                </div>
            </div>
        )
    }
}

export default CSSView;