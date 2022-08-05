import { Link } from 'react-router-dom';

const PreviousOrders = () => {
  return (
    <Link
      to="/previous-orders"
      className="header__previous button--outline button"
    >
      <svg viewBox="0 0 512 512" width="20" height="20" fill="#fe5f1e">
        <path d="M251.2305,448H70.7735a150.4432,150.4432,0,0,0,32.2656-93.5391V64H381.4336V217.1719a8,8,0,0,0,16,0V56a7.9979,7.9979,0,0,0-8-8H95.0391a7.9979,7.9979,0,0,0-8,8V354.4609a134.7126,134.7126,0,0,1-39.711,95.8829A7.9993,7.9993,0,0,0,52.9844,464H251.2305a8,8,0,0,0,0-16Z" />
        <path d="M333.9961,148.7656h-183.52a8,8,0,0,0,0,16h183.52a8,8,0,0,0,0-16Z" />
        <path d="M341.9961,210.9688a7.9979,7.9979,0,0,0-8-8h-183.52a8,8,0,1,0,0,16h183.52A7.9979,7.9979,0,0,0,341.9961,210.9688Z" />
        <path d="M262.2305,265.1719a7.9979,7.9979,0,0,0-8-8H150.4766a8,8,0,0,0,0,16H254.2305A7.9979,7.9979,0,0,0,262.2305,265.1719Z" />
        <path d="M150.4766,311.375a8,8,0,1,0,0,16h65.2539a8,8,0,0,0,0-16Z" />
        <path d="M436.7266,287.4609A103.32,103.32,0,0,0,261.7905,342.873l-6.3569-6.3574a7.9991,7.9991,0,0,0-11.3125,11.3125L262.53,366.2363a8.026,8.026,0,0,0,11.3232,0l18.4126-18.4082a7.9991,7.9991,0,0,0-11.3125-11.3125l-1.8169,1.8164a87.3378,87.3378,0,1,1,22.6568,84.0664,7.9991,7.9991,0,0,0-11.3125,11.3125,103.413,103.413,0,0,0,146.2461-146.25Z" />
        <path d="M363.6055,291.32a7.9979,7.9979,0,0,0-8,8v61.2656a8.115,8.115,0,0,0,2.3506,5.6641l28.9931,28.9922A7.9991,7.9991,0,0,0,398.2617,383.93l-26.6562-26.6563V299.32A7.9979,7.9979,0,0,0,363.6055,291.32Z" />
      </svg>
    </Link>
  );
};

export default PreviousOrders;
