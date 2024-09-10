import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Real-Time Deposit Tracking',
    Svg: require('@site/static/img/undraw_real_time_analytics_re_yliv.svg').default,
    description: (
      <>
        Monitor Ethereum Beacon Chain deposits in real time, ensuring you're always
        updated with the latest ETH movements on the blockchain.
      </>
    ),
  },
  {
    title: 'Comprehensive Metrics & Alerts',
    Svg: require('@site/static/img/undraw_predictive_analytics_re_wxt8.svg').default,
    description: (
      <>
        Visualize key metrics with Grafana and Prometheus, and set up Telegram
        notifications for instant alerts on detected deposits.
      </>
    ),
  },
  {
    title: 'Enterprise-Ready Containerization',
    Svg: require('@site/static/img/undraw_container_ship_re_alm4.svg').default,
    description: (
      <>
        Easily deploy using Docker, integrating seamlessly with monitoring tools
        for enterprise-level performance and scalability.
      </>
    ),
  },
];


function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
