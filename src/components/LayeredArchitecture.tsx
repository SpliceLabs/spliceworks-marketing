import styles from "./LayeredArchitecture.module.css";

interface Layer {
  num: string;
  name: string;
  detail: string;
  color: string;
}

interface LayeredArchitectureProps {
  layers: Layer[];
  governanceLabel: string;
  governanceTags: string[];
}

export function LayeredArchitecture({ layers, governanceLabel, governanceTags }: LayeredArchitectureProps) {
  return (
    <div className={styles.diagram}>
      <div className={styles.layers}>
        {layers.map((layer) => (
          <div
            key={layer.num}
            className={styles.layer}
            style={{ "--layer-color": layer.color } as React.CSSProperties}
          >
            <span className={styles.layerNum}>{layer.num}</span>
            <span className={styles.layerName}>{layer.name}</span>
            <span className={styles.layerDetail}>{layer.detail}</span>
          </div>
        ))}
      </div>
      <div className={styles.governance}>
        <span className={styles.governanceLabel}>{governanceLabel}</span>
        <div className={styles.tags}>
          {governanceTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
