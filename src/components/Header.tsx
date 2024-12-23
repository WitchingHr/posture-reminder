const Header: React.FC = () => {
	return (
		<header style={styles.header}>
			<h1 style={styles.title}>Posture Checker</h1>
		</header>
	);
};

const styles = {
	header: {
		backgroundColor: "#282c34",
		padding: "20px",
		textAlign: "center" as "center",
	},
	title: {
		color: "white",
		fontSize: "2em",
	},
};

export default Header;
