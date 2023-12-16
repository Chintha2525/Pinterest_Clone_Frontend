import ImageGrid from '../../components/Scrollspy/Imagegrid';
import SlideShow from '../../components/Scrollspy/Slideshow';
import SignForm from '../../components/Scrollspy/SignForm';
import './UnauthHome.css'
import Header from '../../components/Header/Header';


const UAHome = () => {
    return (
        <>
        <div id="scroll-spy">

            <div className='outer-wrapper' id="owrapper" >
                <div className='wrapper' id='home' >
                    <Header />
                    <SlideShow />
                </div>
                <div className='wrapper' id='search' >
                    <ImageGrid />
                </div>
                <div className='wrapper uasign' style={{ background: "" }} id='form'>
                    <SignForm />
                </div>
            </div>
        </div>
        </>
    )
}

export default UAHome