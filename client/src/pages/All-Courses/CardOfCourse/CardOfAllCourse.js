import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseInfo } from "../../../Redux/course/courseAction";
import { Col, Container, Row } from "react-bootstrap";
import Spinner_comp from "../../../components/Spinner/Spinner_comp";
//const enroll__course__controller= require('../../../../../controllers/enrollController');
//const CourseEnrollModel=require('../../../../../model/CourseEnrollModel');
//const enroll__course__controller = require('./enrollController')
// import { CourseEnrollModel } from "./CourseEnrollModel";
// var express = require("express");
// var app = express();
//const enroll__course__controller =require('./enrollController');
const useStyles = makeStyles({
  media: {
    height: 140,
  },
});
const CardOfAllCourse = () => {
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const [enroll,setEnroll]=useState(false)
  const {user} = useSelector((state) => state.auth);
  const { courseInfo } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourseInfo());
  }, []);

  const enrollHandler=()=>{
    //enroll__course__controller(user._id,courseInfo._id);
  }


  return (
    <Container>
      <Row className="g-4">
        {courseInfo.length > 0 ? (
          courseInfo.map((val) => {
            return (
              <Col key={val._id} className="g-4" md={4}>
                <Card className="m-3">
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={val.courseThumbnail}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {val.courseName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {val.courseDescription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActionArea className='p-2'>
                  <Button onClick={enrollHandler} variant='contained' color="primary" >Enroll</Button>
                    
                   

                  </CardActionArea>
                </Card>
              </Col>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Spinner_comp />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default CardOfAllCourse;
