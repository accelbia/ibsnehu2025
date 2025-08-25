import React from 'react'
import './index.css';
const ScientificProgrammes: React.FC = () => {
    return (
        <div className="scientific-programmes">
            <h1>Scientific Programmes</h1>
            <p>Besides the presidential address, and special invited plenary lectures, the
                following award lectures are planned during the event.</p>

            <h2>COMMEMORATIVE MEDAL LECTURES</h2>

            <div className="medal-lectures">
                <ul className='medal'>
                    <li>Prof. Birbal Sahni Medal</li>
                    <li>Prof. P. Maheshwari Medal</li>
                    <li>Prof. V. Puri Medal</li>
                    <li>Prof. Y. S. Murty Medal</li>
                </ul>

                <ul className='recipients'>
                    <li>Prof. S. P. Adhikary <span className='honors'>FNAAS</span></li>
                    <li>Prof. Rakesh Pandey <span className='honors'>FNAAS</span></li>
                    <li>Prof. G. S. Shekhawat</li>
                    <li>Dr. Aditya Abha Singh</li>
                </ul>
            </div>

            <h2>Memorial Lectures</h2>
            <div className="medal-lectures">
                <ul className='medal'>
                    <li>Prof. A. K. Sharma Memorial Lecture</li>
                    <li>Prof. L. B. Kajale Memorial Lecture</li>
                </ul>

                <ul className='recipients'>
                    <li>Prof. Swapan Datta <span className='honors'>FNA FASc FNASc FNAAS</span></li>
                    <li>Dr. Sanjeeva Nayaka</li>
                </ul>
            </div>

            <h2>FELICITATIONS</h2>

            <div className="medal-lectures">
                <ul className='medal'>
                    <li>Life Time Achievement Award</li>
                    <li>Prof. H. Y. Mohan Ram Best Teacher Award</li>
                    <li>Prof. P. C. Trivedi Medal Award for Editorial Excellence</li>
                    <li>Prof. S. N. Chaturvedi Memorial Lecture Medal</li>
                    <li>Prof. R. S. Tripathi Memorial Lecture Medal</li>
                    <li>Women Scientist Medal</li>
                    <li>Prof. Y.S.Murty Memorial Gold Medal</li>
                    <li>IBS Active participation recognition Award</li>
                    <li>Senior Botanists</li>
                    <li>Fellows of the Society</li>
                </ul>

                <ul className='recipients'>
                    <li>Prof. Pramod Tandon <span className='honors'>FNASc PADMA SHRI</span></li>
                    <li>Prof. Harendra Nath Pandey</li>
                    <li>Prof. Joginder Singh Panwar</li>
                    <li>Prof. Pravin Chandra Trivedi</li>
                    <li>Prof. Eklabya Sharma <span className='honors'>FNA FNASc PADMA SHRI</span></li>
                </ul>
            </div>

        </div>
    )
}
export default ScientificProgrammes;