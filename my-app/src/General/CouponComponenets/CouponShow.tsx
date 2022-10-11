

type Props = {
    image?: String,
    description: String,
    price: number
}

const CouponShow = (props : Props) => {
    return (
        <li>
            <h2>{props.image}</h2>
            <h2>{props.description}</h2>
            <h3>{props.price}</h3>
        </li>  
);
}

export default CouponShow;