"use client";

import React from "react";
import { Question } from "@prisma/client/edge";

import {
  Select,
  SelectSection,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

interface CreatorEditProps {
  question: Question;
}

const CreatorEdit: React.FC<CreatorEditProps> = ({ question }) => {
  // todo handle state when question is resolved
  return (
    <div>
      <Card className="max-w-lg">
        <CardHeader>
          <h1>Creator Options</h1>
        </CardHeader>
        <CardBody>
          <Select label="Resolve Question">
            <SelectItem key="yes" value="yes" color="success">
              Resolve to Yes
            </SelectItem>
            <SelectItem key="no" value="no" color="warning">
              Resolve to No
            </SelectItem>
          </Select>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreatorEdit;
