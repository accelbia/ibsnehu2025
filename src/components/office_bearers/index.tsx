import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import data from './data.json';
import './index.css';
// Register the SplitText plugin
gsap.registerPlugin(SplitText);

interface OfficeBearersProps {
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
}

const OfficeBearers: React.FC<OfficeBearersProps> = ({ isVisible, setIsVisible }) => {

    const headingRef = useRef<HTMLHeadingElement>(null);
    const sectionsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsVisible(false);
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible, setIsVisible]);


    useEffect(() => {
        if (isVisible && headingRef.current) {
            const split = new SplitText(headingRef.current, { type: 'chars' });
            gsap.from(split.chars, {
                duration: 1,
                opacity: 0,
                y: 10,
                stagger: 0.05,
                ease: 'power2.out',
            });
        }
    }, [isVisible]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: 'power2.out',
                        });
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 20% of the element is visible
        );

        sectionsRef.current.forEach((section) => {
            gsap.set(section, { opacity: 0, y: 50 }); // Initial state
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, [isVisible]);

    if (!isVisible) {
        return null;
    }

    const display_chairpeople = Object.entries(data)
        .slice(0, 2)
        .map(([key, value], index) => (
            <div
                key={index}
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    maxWidth: '300px',
                    minWidth: '250px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <h2>
                    <div style={{ wordBreak: 'break-word', lineHeight: '1em', height: '3em', overflow: 'hidden' }}>
                        {key}
                    </div></h2>
                <div style={{ fontSize: '16px', color: '#555' }}>
                    {Object.entries(value).map(([subKey, subValue], subIndex) => (
                        <div className="member-l1" key={subIndex}>
                            <div className="subkey">
                                {subKey}
                            </div>
                            <div className="subvalue">
                                {subValue}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));

    const display_other_members = Object.entries(data)
        .slice(2, 4)
        .map(([key, value], index) => (
            <div
                key={index}
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    width: '1000px',
                    maxWidth: '90%',
                    minWidth: '300px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                    marginTop: '16px',
                }}
            >
                <h2>
                    {key}
                </h2>
                {Array.isArray(value) && value.map((item: { [key: string]: string }, subIndex: number) => (
                    <div
                        key={subIndex}
                        style={{
                            borderTop: '1px solid #eee',
                            paddingTop: '8px',
                            marginTop: '8px',
                        }}
                    >
                        {Object.entries(item).map(([subKey, subValue], detailIndex) => (
                            <div className="member-l2" key={detailIndex}>
                                {subKey === "Name" && (
                                    <div className="subvalueName">
                                        {subValue}
                                    </div>
                                )}
                                {subKey === "City" && (
                                    <div className="subvalueCity">
                                        {subValue}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ));

    return (
        <>
            <div className="modal">
                <IconButton
                    className="close-button"
                    onClick={() => setIsVisible(false)}
                    aria-label="Close"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <div className="office-bearers" id="office-bearers">

                    <div
                        ref={(el) => {
                            if (el) {
                                sectionsRef.current.push(el);
                            }
                        }}
                    >
                        <h1 ref={headingRef} style={{ marginBottom: '20px' }}>Organizing bodies and Committees</h1>
                    </div>
                    <div
                        className='memberList'
                    >
                        <div className='chairPeople'>
                            {display_chairpeople}
                        </div>
                        <div className="otherMembers">
                            {display_other_members}
                        </div>

                    </div>
                </div>

            </div>
            <div className="fullscreen-blur" onClick={() => setIsVisible(false)}></div>
        </>
    );
}

export default OfficeBearers;