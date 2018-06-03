import React from 'react';
import 'particles.js/particles';
const particlesJS = window.particlesJS;


class ParticleSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };

    }

    componentDidMount() {
        
        //particles.js github page says to load package like so:
        particlesJS.load('particles-js', 'assets/particles.json', function () {
            console.log('callback - particles.js config loaded');
        });
    }


    render() {
        return (
            <div>
            <div id="particles-js"></div>
            </div>
        );
    }
}

export default ParticleSystem;