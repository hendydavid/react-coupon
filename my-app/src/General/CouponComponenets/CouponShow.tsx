

type Props = {
    image?: String,
    description: String,
    price: number
}

const CouponShow = (props : Props) => {
    return (
        <li>
            <h2>{props.image}</h2>
            <h2>Description: {props.description}</h2>
            <h3>Price: {props.price}</h3>
        </li>  
);
}

export default CouponShow;