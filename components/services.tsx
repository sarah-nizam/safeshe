import {
    createStyles,
    Text,
    Container,
    ActionIcon,
    Group,
    rem,
    Paper,
    Input,
    Button,
    Switch,
    Title,
} from "@mantine/core"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    root: {
        marginTop: rem(120),
    },

    flex: {
        display: "flex",
        gap: rem(60),
        marginTop: rem(60),
        flexWrap: "wrap",

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
        },
    },

    card: {
        height: rem(200),
        color: theme.colors.brand[6],
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: rem(40),
        minWidth: rem(250),

        "& .icon": {
            display: "block",
            width: rem(80),
            height: rem(80),
            backgroundColor: theme.colors.brand[6],
        },

        "& .police": {
            WebkitMask: 'url("/icons/icons8-police-50.png") no-repeat center',
            mask: 'url("/icons/icons8-police-50.png") no-repeat center',
        },

        "& .review": {
            WebkitMask: 'url("/icons/icons8-review-50.png") no-repeat center',
            mask: 'url("/icons/icons8-review-50.png") no-repeat center',
        },

        "& .map": {
            WebkitMask: 'url("/icons/icons8-map-50.png") no-repeat center',
            mask: 'url("/icons/icons8-map-50.png") no-repeat center',
        },

        "& .evidence": {
            WebkitMask: 'url("/icons/icons8-evidence-50.png") no-repeat center',
            mask: 'url("/icons/icons8-evidence-50.png") no-repeat center',
        },

        "&:hover": {
            background: theme.colors.brand[6],
            color: "white",

            "& .icon": {
                backgroundColor: "white",
            },
        },
    },

    icon: {},

    icontext: {
        fontWeight: 500,
        fontSize: rem(18),
    },

    title: {
        fontWeight: 500,
        fontSize: rem(44),
    },

    subTitle: {
        fontSize: rem(20),
        color: theme.colors.gray[6],
    },

    heading: {
        textAlign: "center",
        marginBottom: rem(20),
    },
    linkClass:{
        textDecoration:'none',
    },
}))

export default function Services() {
    const { classes } = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <Title className={classes.title}>Our Services</Title>
                <span className={classes.subTitle}>
                    Serving the best we can
                </span>
            </div>
            <div className={classes.flex}>
            <Link className={classes.linkClass} href="/revv">
                <Paper shadow="md" p="xl" radius="xl" className={classes.card}>
                    <span className="review icon"></span>
                    
                    <span className={classes.icontext}>
                        Leave a Review
                    </span>
                    
                </Paper>
                </Link>

                <Link className={classes.linkClass} href="https://www.google.com/maps/@27.1381927,80.8593041,7z">
                <Paper shadow="md" p="xl" radius="xl" className={classes.card}>
                    <span className="map icon"></span>
                    <span className={classes.icontext}>
                        How Safe is My Area
                    </span>                 
                </Paper>
                </Link>

                <Paper shadow="md" p="xl" radius="xl" className={classes.card}>
                    <span className="evidence icon"></span>
                    <span className={classes.icontext}>
                        Record Evidence
                    </span>
                </Paper>

                <Link className={classes.linkClass} href="https://www.google.com/search?q=police+stations+near+me&rlz=1C1CHZN_enIN977IN977&oq=police+stations+near+me&aqs=chrome..69i57j0i512l5j0i22i30l4.8499j0j7&sourceid=chrome&ie=UTF-8#bsht=Cgdic2h3Y2hwEgQIBDAB">
                <Paper shadow="md" p="xl" radius="xl" className={classes.card}>
                    <span className="police icon"></span>                   
                    <span className={classes.icontext}>Help Near Me</span>                   
                </Paper>
                </Link>
            </div>
        </div>

    )

}
