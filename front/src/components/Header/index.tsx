import React from 'react';

interface HeaderInterface {
    children?: React.ReactNode,
}

const HeaderComponent = (props: HeaderInterface) => {

    return (
        <div>
            {props.children}
        </div>
    );
};

HeaderComponent.displayName = 'Header';

export default HeaderComponent;